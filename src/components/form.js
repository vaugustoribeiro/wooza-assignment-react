import React, {
    useEffect,
    useState
} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import SelectedPlatform from './selected-platform'
import SelectedPlan from './selected-plan'

function Form({ match, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telephone, setTelephone] = useState('')
    const [birthDate, setBirthDate] = useState(new Date())

    function canSubmit() {
        return name && email && cpf && telephone && birthDate
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <form
                        style={{
                            width: 300,
                            flexDirection: 'column',
                            marginRight: 30
                        }}
                    >
                        <Typography variant='h4'>Quem é você?</Typography>

                        <TextField
                            label="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <DatePicker
                            disableFuture
                            openTo="year"
                            format="dd/MM/yyyy"
                            label="Data de Nascimento"
                            views={["year", "month", "date"]}
                            value={birthDate}
                            onChange={setBirthDate}
                            style={{
                                marginTop: 16,
                                marginBottom: 8
                            }}
                            fullWidth
                        />
                        <TextField
                            label="Cpf"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Telefone"
                            value={telephone}
                            onChange={e => setTelephone(e.target.value)}
                            margin="normal"
                            fullWidth
                        />

                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={!canSubmit()}>Solicitar</Button>
                    </form>

                    <div>
                        <Typography variant='h5'>Resumo da Solicitação</Typography>
                        <SelectedPlatform />
                        <SelectedPlan />
                    </div>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default Form