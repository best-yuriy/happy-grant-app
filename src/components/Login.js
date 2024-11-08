import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        console.log("login", e);
        // TODO: use signInWithEmailAndPassword before redirect
        navigate("/info");
    }

    return (
        <div>
            <form>                                              
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"                                    
                        required                                                                                
                        placeholder="Email address"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"                                    
                        required                                                                                
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button                                    
                        onClick={onLogin}                                        
                    >      
                        Login                                                                  
                    </button>
                </div>                               
            </form>

            <p className="text-sm text-white text-center">
                Need an account?{' '}
                <NavLink to="/signup">
                    Sign up
                </NavLink>
            </p>
        </div>
    );
}

export default Login;
