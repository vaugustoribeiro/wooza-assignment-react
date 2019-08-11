import React, {
    useState
} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MaskedInput from 'react-text-mask'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

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
    const splitedDate = new Date().toLocaleDateString().split('/')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [cellPhone, setCellPhone] = useState('')
    const [birthDate, setBirthDate] = useState(`${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`)
    const [isEmailValid, setIsEmailValid] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedPlatform, setSelectedPlatform] = useState(null)
    const [hiring, setHiring] = useState(false)
    const [done, setDone] = useState(false)

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

    async function hire() {

        if (!canSubmit()) {
            return
        }

        setHiring(true)

        // simulates an api call
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 3000)
        })

        setHiring(false)
        setDone(true)

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

    function getTitle() {
        let title
        if (hiring) {
            title = 'Contratando...'
        } else if (done) {
            title = `Parabéns, ${name.split(' ')[0]}!`
        } else {
            title = `Olá, precisamos de mais informações!`
        }
        return title
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <OptionsContainer
                title={getTitle()}
                hideBackButton={done}
            >
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
                            disabled={done}
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
                                disabled={done}
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
                                disabled={done}
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
                                disabled={done}
                            />
                            <TextField
                                label='Data de Nascimento'
                                value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}
                                margin='normal'
                                fullWidth
                                type="date"
                                disabled={done}
                            />
                        </div>
                        {
                            !done &&
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                disabled={!canSubmit() || hiring || done}
                                style={{
                                    marginTop: 15
                                }}
                                onClick={hire}
                            >Contratar</Button>
                        }
                    </form>
                </div>
                {
                    hiring &&
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }}
                    >
                        <CircularProgress />
                    </div>
                }
                {
                    done &&
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }}
                    >
                        <Typography variant='h5'>Assinatura realizada com sucesso! 😃</Typography>
                    </div>
                }
            </OptionsContainer>
            <div
                style={{
                    marginLeft: 10
                }}
            >
                <ChosenPlan
                    title='Plano contratado'
                    setSelectedPlan={setSelectedPlan}
                    setSelectedPlatform={setSelectedPlatform}
                    disabled={done || hiring}
                />
            </div>
        </div>
    )
}

export default Form