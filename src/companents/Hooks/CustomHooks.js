import { useEffect, useState } from "react";
import axios from 'axios'
function GitApiData(){
    const [username, setUsername] = useState('');
    const [gitdata, setGitData] = useState({ name: '', url: '',createId: '' });

    const inputHandler = (e) => {
        setUsername(e.target.value);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!username) return; // Don't make request if username is empty

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}`);
                setGitData({ name: response.data.name, url: response.data.avatar_url,createId: response.data.created_at });
                console.log(gitdata);
            } catch (error) {
                console.log(`Username not found: ${error}`);
                setGitData({ name: '', url: '',createId: '' }); // Clear data in case of error
            }
        };

        fetchData();

        }, 800);
            return ()=> clearTimeout(timer) // debouncing feature apply
    }, [username]);

    return{gitdata,inputHandler}
}

export default GitApiData;