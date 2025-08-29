import { useRef } from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid' 
import api from '../../services/api'

//todas as vezes que fizermos uma requisição de uma api ou algo fora(mesmo que esteja no mesmo pc) devemos avisar que ele vai fazer essa função assincrona 
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    //react hoock form seria o indicado para capturar o formulario de cadastro


    const emailRef = useRef()
    const passwordRef = useRef()
    
    async function handleSubmit (event) {
        event.preventDefault()//para não carregar a pagina quando enviar o form

        try{
        await api.post('/login', { //puxando lá do servidor
            email: emailRef.current.value,
            password: passwordRef.current.value
        })

        console.log(emailRef.current.value)
        console.log(passwordRef.current.value)

        alert("Login OK")
        } catch (err){
            console.error(err);
            alert("Senha ou Email incorretos")
        }
    }

    return(
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

                <input 
                ref={emailRef} 
                placeholder="Email" 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />

                <div className="relative"> {/* Envolvendo o input de senha em um div relativo */}
                    <input 
                        ref={passwordRef}
                        placeholder="Senha" 
                        type={showPassword ? "text" : "password"} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <div 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </div>
                <button className="w-full bg-violet-800 text-white text-bol font-weight: 700 py-2 px-4 rounded-md hover:bg-violet-600">Login</button>
            </form>
            <Link to="/" className="text-violet-800 hover:underline mt-4 block text-center">Não tem uma conta? Cadastre-se aqui</Link>
        </div>
    )
}

export default Login