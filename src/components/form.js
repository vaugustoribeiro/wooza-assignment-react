import React, {
    useState
} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MaskedInput from 'react-text-mask'

import ChosenPlan from './chosen-plan'

import OptionsContainer from './options-container'

const MaskedCpfInput = props => {
    const { inputRef, ...other } = props
    return <MaskedInput
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        {...other}
        required={true}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }} />
}

const MaskedCellPhoneInput = (props) => {
    const { inputRef, ...other } = props
    return <MaskedInput
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        {...other}
        required={true}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }} />
}

function Form({ match, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [cellPhone, setCellPhone] = useState('')
    const [birthDate, setBirthDate] = useState(new Date())
    const [isEmailValid, setIsEmailValid] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedPlatform, setSelectedPlatform] = useState(null)

    function validateEmail() {
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const isEmailValid = re.test(String(email).toLowerCase())

        return isEmailValid
    }

    function canSubmit() {
        return name
            && isEmailValid
            && cpf
            && cpf.indexOf(' ') === -1
            && cellPhone
            && birthDate
    }

    function hire() {
        console.log({
            nome: name,
            email: email,
            cpf: cpf,
            telefoneCelular: cellPhone,
            dataDeNascimento: birthDate,
            platforma: {
                ...selectedPlatform,
                plano: {
                    ...selectedPlan
                }
            }
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <OptionsContainer title={`Olá, precisamos de mais informações!`}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingLeft: 10,
                        width: 500
                    }}
                >
                    <form
                        style={{
                            flexDirection: 'column',
                            flex: 1
                        }}
                    >
                        <TextField
                            label='Nome'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            margin='normal'
                            fullWidth
                        />

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <TextField
                                label='Email'
                                value={email}
                                onChange={e => {
                                    const email = e.target.value
                                    setEmail(email)
                                }}
                                onBlur={e => {
                                    const isEmailValid = validateEmail(email)
                                    setIsEmailValid(isEmailValid)
                                }}
                                margin='normal'
                                style={{
                                    marginRight: 20
                                }}
                                type='email'
                                fullWidth
                                error={isEmailValid === null ? false : !isEmailValid}
                            />
                            <TextField
                                label='Celular'
                                value={cellPhone}
                                onChange={e => setCellPhone(e.target.value)}
                                margin='normal'
                                fullWidth
                                InputProps={{
                                    inputComponent: MaskedCellPhoneInput
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <TextField
                                label='CPF'
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                margin='normal'
                                style={{
                                    marginRight: 20
                                }}
                                fullWidth
                                InputProps={{
                                    inputComponent: MaskedCpfInput
                                }}
                            />
                            <TextField
                                label='Data de Nascimento'
                                value={birthDate}
                                onChange={setBirthDate}
                                margin='normal'
                                fullWidth
                                type="date"
                            />
                        </div>


                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={!canSubmit()}
                            style={{
                                marginTop: 15
                            }}
                            onClick={hire}
                        >Contratar</Button>
                    </form>
                </div>
            </OptionsContainer>
            <div
                style={{
                    marginLeft: 10
                }}
            >
                <ChosenPlan
                    setSelectedPlan={setSelectedPlan}
                    setSelectedPlatform={setSelectedPlatform}
                />
            </div>
        </div>
    )
}

export default Form