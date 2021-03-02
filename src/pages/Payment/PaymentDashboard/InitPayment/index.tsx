import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FaBarcode, FaUser } from 'react-icons/fa';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { MdCheck } from 'react-icons/md';
import PaymentCard from 'react-payment-card-component';
import { useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import pagarme from 'pagarme';
import * as Yup from 'yup';

import Layout from '../../../_layouts/auth';
import { ScheduleItem } from '../../../_layouts/auth/styles';
import {
  GobackButton,
  Header,
  Form,
  Footer,
} from '../../../_layouts/auth/styles';
import api from '../../../../_services/api';
import giveClassesIcon from '../../../../assets/images/icons/give-classes.svg';
import studyIcon from '../../../../assets/images/icons/study.svg';
import Input from '../../../../components/Form/Input';
import { useAuth } from '../../../../hooks/auth';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import authRoutes from '../../../../routes/Routes/AuthRoutes';
import ICourse from '../../../../types/course';
import { formatPrice, getCardType, onlyNumbers } from '../../../../utils';
import getValidationErros from '../../../../utils/getValidationErros';
import * as masks from '../../../../utils/masks';
import {
  schemaValidationCardDate,
  schemaValidationCardNumber,
  schemaValidationCardInstallment,
} from '../../../../utils/schema';
import { MyButton } from '../../../User/Login/SignIn/styles';
import Select from './Select';
import {
  ButtonsContainer,
  ButtonCreditCard,
  ButtonAnother,
  Content,
  ScheduleItemCard,
  ButtonBoleto,
} from './styles';

interface ParamTypes {
  courseId: string;
}

interface IFormData {
  card_holder_name: string;
  card_number: string;
  card_expiration_date: string;
  card_cvv: string;
  course_id: string;
  course_price: string;
  installment: string;
}

const InitPayment: React.FC = () => {
  const { courseId } = useParams<ParamTypes>();
  const history = useHistory();

  const { user } = useAuth();
  const addressId = user?.person?.address_id_main;
  const phoneId = user?.person?.phone_id_man;

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();

  const [paymentForm, setPaymentForm] = useState<number>(0);

  const handlePaymentFormCreditCart = useCallback(() => {
    setPaymentForm(0);
  }, [setPaymentForm]);

  const handlePaymentFormBoleto = useCallback(() => {
    setPaymentForm(1);
  }, [setPaymentForm]);

  const handlePaymentFormAnother = useCallback(() => {
    setPaymentForm(2);
  }, [setPaymentForm]);

  const [course, setCourse] = useState<ICourse>({} as ICourse);

  const [renderInstallments, setRenderInstallments] = useState([
    { label: '', value: '' },
  ]);

  const [installments, setInstallments] = useState(0);

  const loadInstallment = useCallback(
    (data: ICourse) => {
      setRenderInstallments(
        [...new Array(4)].map((_, idx) => {
          const installment = idx + 1;
          return {
            label: `${installment} x  ${formatPrice(
              Number(data.price) / installment,
            )}`,
            value: `${installment}`,
          };
        }),
      );
    },
    [setRenderInstallments],
  );

  const handleLoadCourse = useCallback(async () => {
    if (Object.keys(course).length !== 0) return;

    const { data } = await api.get(`courses/${courseId}`);

    setCourse({ ...data });

    loadInstallment(data);
  }, [courseId, course, loadInstallment]);

  useEffect(() => {
    handleLoadCourse();
  }, [handleLoadCourse]);

  useEffect(() => {
    if (Object.keys(course).length === 0) return;
    loadInstallment(course);
  }, [course, loadInstallment, phoneId, addressId]);

  const handleSubmitCard = useCallback(
    async (data_: IFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          card_holder_name: Yup.string().required('Nome obrigatório'),
          card_number: schemaValidationCardNumber,
          card_expiration_date: schemaValidationCardDate,
          card_cvv: Yup.string().required(
            'Código de segurança do cartão obrigatório',
          ),
          installment: schemaValidationCardInstallment(installments),
        });

        await schema.validate(data_, {
          abortEarly: false,
        });

        const month = data_.card_expiration_date.slice(0, -5);
        const year = data_.card_expiration_date.substr(-2);

        const card_number = data_.card_number.replace(/([^0-9])/g, '');
        const card_expiration_date = `${month}${year}`;
        const newData = { ...data_, card_number, card_expiration_date };

        const client_retur = await pagarme.client
          .connect({
            encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
          })
          .then((client_: any) => {
            return client_;
          });

        const card_hash = await client_retur.security.encrypt(newData);

        const amount = Number(course.price) * 100;
        const fee = 0;

        await api.post('orders/payments/card/new', {
          card_hash,
          fee,
          installments,
          courses: [{ id: courseId }],
          amount,
        });

        history.push('/payments/dashboard/init-payment/finally/successes');

        addToast({
          type: 'success',
          title: 'Pagamento efetuado!',
          description: 'Pagamento efetuado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha no pagamento!',
          description:
            'Ocorreu uma falha ao tentar fazer o pagamento, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [
      addToast,
      addLoading,
      removeLoading,
      formRef,
      course.price,
      courseId,
      history,
      installments,
    ],
  );

  const handleSubmitBoleto = useCallback(async () => {
    try {
      addLoading({
        loading: true,
        description: 'Aguarde ...',
      });

      const amount = Number(course.price) * 100;
      const fee = 0;

      const { data } = await api.post('orders/payments/boleto/new', {
        fee,
        installments: 1,
        courses: [{ id: courseId }],
        amount,
      });

      window.open(
        `https://api.pagar.me/${data.boleto_url}?format=pdf`,
        '_blank',
      );

      //history.push('https://api.pagar.me/1/boletos/test_ckj9yiyvy1obb0gm5g9yfpgbw?format=pdf');
      history.push(authRoutes.paymentsDashboardInitPaymentFinallySuccesses);

      addToast({
        type: 'success',
        title: 'Pagamento efetuado!',
        description: 'Pagamento efetuado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha no pagamento!',
        description:
          'Ocorreu uma falha ao tentar fazer o pagamento, tente novamente!',
      });
    } finally {
      removeLoading();
    }
  }, [addToast, addLoading, removeLoading, course.price, courseId, history]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      if (Object.keys(data).length > 0) {
        handleSubmitCard(data);
      } else {
        handleSubmitBoleto();
      }
    },
    [handleSubmitBoleto, handleSubmitCard],
  );

  function handleSelectInstallments(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setInstallments(Number(value));
  }

  const [nameCart, setNameCart] = useState('');
  const [numberCart, setNumberCart] = useState('');
  const [expirationCart, setExpirationCart] = useState('');
  const [cvvCart, setCvvCart] = useState('');
  const [cardType, setCardType] = useState<string | undefined>('');
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleInputChangeNumber = useCallback(
    (e: any) => {
      setNumberCart(e.target.value);
      masks.cardNumberByMask.onChange(e);
      setCardType(getCardType(onlyNumbers(e.target.value)));
      setFlipped(false);
    },

    [setNumberCart, setCardType, setFlipped],
  );

  const handleInputChangeName = useCallback(
    (e: any) => {
      setNameCart(e.target.value);
      masks.lettlerByMask.onChange(e);
      setFlipped(false);
    },
    [setNameCart, setFlipped],
  );

  const handleInputChangeExpiration = useCallback(
    (e: any) => {
      setExpirationCart(e.target.value);
      masks.cardDateMask.onChange(e);
      setFlipped(false);
    },
    [setExpirationCart, setFlipped],
  );

  const handleInputChangeCvv = useCallback(
    (e: any) => {
      setCvvCart(e.target.value);
      masks.cardCVVByMask.onChange(e);
      setFlipped(true);
    },
    [setCvvCart, setFlipped],
  );

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <GobackButton type="button" onClick={() => goBack()}>
            <span>
              <FiArrowLeft />
            </span>
            <strong>Voltar</strong>
          </GobackButton>

          <p>
            Dashboard de pagamento! <br />
            {course?.name}
          </p>
        </Header>

        <fieldset>
          <legend>Formas de Pagamento</legend>

          <ButtonsContainer>
            {paymentForm !== 0 && (
              <ButtonCreditCard
                type="button"
                onClick={() => handlePaymentFormCreditCart()}
              >
                <img src={studyIcon} alt="Cartão de Crédito" />
                Cartão de Crédito
              </ButtonCreditCard>
            )}
            {paymentForm !== 1 && (
              <ButtonBoleto
                type="button"
                onClick={() => handlePaymentFormBoleto()}
              >
                <img src={giveClassesIcon} alt="Boleto" />
                Boleto bancário
              </ButtonBoleto>
            )}
            {paymentForm !== 2 && (
              <ButtonAnother
                type="button"
                onClick={() => handlePaymentFormAnother()}
              >
                <img src={giveClassesIcon} alt="Transferência" />
                Transferência
              </ButtonAnother>
            )}
          </ButtonsContainer>
        </fieldset>

        {paymentForm === 0 && (
          <>
            <fieldset>
              <legend>Selecionado [Cartão de Crédito] </legend>

              <Select
                name="installment"
                label="Número de parcelas"
                id="idInstallment"
                onChange={handleSelectInstallments}
                options={renderInstallments}
              />

              <ScheduleItem>
                <fieldset>
                  <Input
                    placeholder="Nome como está no cartão"
                    name="card_holder_name"
                    icon={FaUser}
                    label="Nome"
                    onChange={handleInputChangeName}
                  />
                  <Input
                    icon={MdCheck}
                    placeholder="Número do cartão"
                    name="card_number"
                    label="Número do cartão"
                    onChange={handleInputChangeNumber}
                  />

                  <Input
                    id="idCardExpirationDate"
                    name="card_expiration_date"
                    label="Data de expiração"
                    icon={MdCheck}
                    placeholder="Ex: mm/yyyy"
                    onChange={handleInputChangeExpiration}
                  />
                  <Input
                    id="idCardCvv"
                    name="card_cvv"
                    label="Código de segurança"
                    placeholder="Ex: 000"
                    onChange={handleInputChangeCvv}
                  />
                </fieldset>
                <fieldset>
                  <ScheduleItemCard>
                    <PaymentCard
                      style={{ widt: '100px' }}
                      bank="default"
                      model="normal"
                      type="nomal"
                      brand={cardType}
                      number={numberCart}
                      cvv={cvvCart}
                      holderName={nameCart}
                      expiration={expirationCart}
                      flipped={flipped}
                    />
                  </ScheduleItemCard>
                </fieldset>
              </ScheduleItem>

              <MyButton type="submit">
                <span>
                  <FiCheck />
                </span>
                <strong>Fazer pagamento</strong>
              </MyButton>
            </fieldset>
          </>
        )}

        {paymentForm === 1 && (
          <fieldset>
            <legend>Selecionado [Boleto]</legend>

            <MyButton type="submit">
              <span>
                <FaBarcode />
              </span>
              <strong>Gerar boleto</strong>
            </MyButton>
          </fieldset>
        )}
      </Form>

      {paymentForm === 2 && (
        <Content>
          <fieldset>
            <legend>Selecionado [Transferência]</legend>

            <div>
              <h3>Dados para transferência.</h3>

              <span>
                <h2>Banco:</h2>
                <strong>Brasil</strong>
              </span>

              <span>
                <h2>Agência:</h2>
                <strong>1867-8</strong>
              </span>

              <span>
                <h2> Conta/Corrente:</h2>
                <strong>51.105-6</strong>
              </span>

              <span>
                <h2>Em nome de: </h2>
                <strong>Djamilson Alves da Costa</strong>
              </span>

              <span>
                <h2>Pix: </h2>
                <strong>3f7db044-2c94-42bc-b83b-fabd6b019f3c</strong>
              </span>
            </div>
          </fieldset>
        </Content>
      )}

      <Footer>
        {paymentForm === 2 && (
          <span>
            <h2>O comprovante deve ser enviando para o email</h2>
            <strong>djamilson@gmail.com</strong>
          </span>
        )}
      </Footer>
    </Layout>
  );
};

export default InitPayment;
