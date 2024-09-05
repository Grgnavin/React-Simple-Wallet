import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Airdrop from "./components/Airdrop";
import SignMessage from "./components/SignMessage";
import SendSolana from "./components/SendSolana";

function App() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/8a14Dkw-EgC15NeZjMKI_JOU3lclHilN"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton/>
          <div>
              <Airdrop />
              <SignMessage />
              <SendSolana />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
