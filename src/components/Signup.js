import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Signup() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("submit", e);
        // TODO: use createUserWithEmailAndPassword before redirect
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
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required                                    
                        placeholder="Email address"                                
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required                                 
                        placeholder="Password"              
                    />
                </div>                                             

                <button
                    type="submit" 
                    onClick={onSubmit}                        
                >  
                    Sign up                                
                </button>

            </form>

            <p>
                Already have an account?{' '}
                <NavLink to="/login" >
                    Sign in
                </NavLink>
            </p>  
        </div>
    );
}

export default Signup;
