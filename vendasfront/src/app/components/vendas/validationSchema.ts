import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
    cliente: Yup.object().nullable(true).required('Campo obrigatório'),
    itens: Yup.array().min(1, 'Deve conter pelo menos um produto.'),
    formaPagamaento: Yup.string().trim().required('Campo obrigatório.')
})