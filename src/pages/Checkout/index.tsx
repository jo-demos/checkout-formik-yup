import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface CheckoutDataProps {
    name: string;
    email: string;
    ccName: string;
    ccNumber: string;
    ccExpiration: string;
    ccCvv: string;
}

const initialValues = {
    name: 'João da Silva',
    email: 'joao@silva.com',
    ccName: 'JOAO SILVA',
    ccNumber: '5525083832884614',
    ccExpiration: '12/2030',
    ccCvv: '123'
} as CheckoutDataProps

const validations = yup.object().shape<CheckoutDataProps>({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    ccName: yup.string().max(50).required(),
    ccNumber: yup.string().required(),
    ccExpiration: yup.string().required(),
    ccCvv: yup.string().required(),
});

export default function Checkout() {
    async function handleSubmit(values: CheckoutDataProps, { setSubmitting }: FormikHelpers<CheckoutDataProps>) {
        console.log(values);

        setSubmitting(false);
    }

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Checkout</h2>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validations}>
                {({ isSubmitting } : FormikValues) => (
                    <Form action="/process" method="post">
                        <div className="row">
                            <div className="col-md-4 order-md-2 mb-4">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Carrinho</span>
                                    <span className="badge badge-secondary badge-pill">1</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">Item</h6>
                                        </div>
                                        <span className="text-muted">R$ 100,00</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total</span>
                                        <strong>R$ 100,00</strong>
                                    </li>
                                </ul>

                                <div className="input-group">
                                    <Field type="text" className="form-control" name="coupon" placeholder="Cupom" />
                                    <ErrorMessage component="span" name="coupon" />
                                </div>
                            </div>
                            <div className="col-md-8 order-md-1">
                                <h4 className="mb-3">Dados pessoais</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name">Nome</label>
                                        <Field type="text" className="form-control" id="name" name="name" />
                                        <ErrorMessage component="span" name="name" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email">Email</label>
                                        <Field type="text" className="form-control" id="email" name="email" />
                                        <ErrorMessage component="span" name="email" />
                                    </div>
                                </div>

                                <hr className="mb-4" />

                                <h4 className="mb-3">Pagamento</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name">Nome no cartão</label>
                                        <Field type="text" className="form-control" id="ccName" name="ccName" />
                                        <ErrorMessage component="span" name="ccName" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Número</label>
                                        <Field type="text" className="form-control" id="ccNumber" name="ccNumber" />
                                        <ErrorMessage component="span" name="ccNumber" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label>Expiração</label>
                                        <Field type="text" className="form-control" id="ccExpiration" name="ccExpiration" />
                                        <ErrorMessage component="span" name="ccExpiration" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>CVV</label>
                                        <Field type="text" className="form-control" id="ccCvv" name="ccCvv" />
                                        <ErrorMessage component="span" name="ccCvv" />
                                    </div>
                                </div>

                                <hr className="mb-4" />

                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}