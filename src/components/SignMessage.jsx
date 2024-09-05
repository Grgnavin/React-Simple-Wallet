import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();

    const SendMessage = async () => {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const message = document.getElementById('message').value;
        const enCodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(enCodedMessage);
        console.log(message, enCodedMessage, signature);
        
        if (!ed25519.verify(signature, enCodedMessage, publicKey.toBytes())) throw new Error("Message signature invalid");
        alert(`Success Message signature: ${bs58.encode(signature)}`);
    }

    return (
        <div>
            <input type="text" placeholder='Message' id="message" />
            <button onClick={SendMessage}>Sign Message</button>
        </div>
    )
}

export default SignMessage