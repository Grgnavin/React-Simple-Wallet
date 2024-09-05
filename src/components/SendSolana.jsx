import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { Buffer } from 'buffer';  // Polyfill Buffer for browser use
window.Buffer = Buffer;  // Set Buffer as a global object

const SendSolana = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const sendToken = async () => {
        if (!wallet.publicKey) {
            throw new Error("Wallet not connected")
        }
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        console.log(new PublicKey(to));
        
        // Validate the recipient public key
        if (!PublicKey.isOnCurve(new PublicKey(to).toBytes())) {
            throw new Error("Invalid recipient public key.");
        }

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }))
        
        await wallet.sendTransaction(transaction, connection);
        alert(`Send ${amount} of SOL to ${to}`)
    }

    return (
        <div>
            <input id="to" type="text" placeholder="To" />
            <input id="amount" type="text" placeholder="Amount" />
            <button onClick={sendToken}>Send SOL</button>
        </div>
    )
}

export default SendSolana
