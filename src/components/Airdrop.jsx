import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState('');
    
    const sendAirdrop = async () => {
        const amount = parseFloat(document.getElementById("publickey").value);
        
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid SOL amount");
            return;
        }

        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert(`Airdropped ${amount} SOL`);
        getBalance(); // Refresh the balance after airdrop
    };

    const getBalance = async () => {
        if (wallet.publicKey) {
            const blc = await connection.getBalance(wallet.publicKey);
            setBalance(blc / LAMPORTS_PER_SOL);
        }
    };

    // Fetch the balance when the component mounts
    getBalance();

    return (
        <div>
            <div>{`Hi, this is your public key: ${wallet.publicKey}`}</div>
            <div>
                <input
                    id="publickey" 
                    type="text" 
                    placeholder="Enter SOL amount" 
                />
                <button onClick={sendAirdrop}>
                    Send Airdrop
                </button>
            </div>
            <div>
                {balance ? `SOLANA BALANCE: ${balance}` : "No Solana balance"}
            </div>
        </div>
    );
};

export default Airdrop;
