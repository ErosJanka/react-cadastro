import { useRef } from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid' 
import api from '../../services/api'

//todas as vezes que fizermos uma requisição de uma api ou algo fora(mesmo que esteja no mesmo pc) devemos avisar que ele vai fazer essa função assincrona 
function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    //react hoock form seria o indicado para capturar o formulario de cadastro

    
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    async function handleSubmit (event) {
        event.preventDefault()//para não carregar a pagina quando enviar o form

        try{
        await api.post('/cadastro', { //puxando lá do servidor
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })

        console.log(nameRef.current.value)
        console.log(emailRef.current.value)
        console.log(passwordRef.current.value)

        alert("Usuario Cadastrado com sucesso")
        } catch (err){
            console.error(err);
            alert("Erro ao cadastrar Usuario")
        }
    }

    return(
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input 
                ref={nameRef} 
                placeholder="Nome" 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />

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
                <button className="w-full bg-violet-800 text-white text-bol font-weight: 700 py-2 px-4 rounded-md hover:bg-violet-600">Cadastrar-se</button>
            </form>
            <Link to="/login" className="text-violet-800 hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
        </div>
    )
}

export default Cadastro