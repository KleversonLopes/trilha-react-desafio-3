import { Link, useNavigate  } from "react-router-dom";
import { Container, Title } from "../home/styles";
import { Header } from '../../components/Header';
import { Column, CriarText, Row, SubtitleLogin, TitleLogin, Wrapper } from "../login/styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { MdAccountCircle, MdEmail, MdLock } from 'react-icons/md'

const SignUp = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const {data} = await api.get(`/users?email=${formData.email}`);
            if (data.length && data[0].id) {
                alert(`A conta  ${formData.email}  já existe.\n\nFaça Login.`);
                return;
            }
        } catch(e) {
            alert(`Erro ao criar conta\n${e}`);
            return;
        }

        try{
            const {data} = await api.post('/users', formData);
            alert(`Conta criada com sucesso`);
            console.log(`data ${JSON.stringify(data)}`);
            navigate('/feed');
        } catch(e) {
            alert(`Erro ao criar conta\n${e}`)
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdAccountCircle/>} name="nome"  control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Criar minha conta" variant="secondary" type="submit"/>
                    </form>
                    <br/><br/>
                    <SubtitleLogin>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleLogin>
                    <Row>
                        <span>Já tenho conta.</span>
                        <Link to='/login'>
                            <CriarText>Fazer login</CriarText>
                        </Link>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
};

export { SignUp };