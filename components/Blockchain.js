import React, {useState, useEffect} from 'react';

export default function Blockchain() {
	const [provider, setEthers] = useState(null);
  const [address, setAddress] = useState(null);
	const [signing, setSigning] = useState(null);
	const [verified, setVerified] = useState(false);
	const { ethers } = require("ethers");

	// for testing
  useEffect(() => {
		console.log(provider);
		console.log(address);
		console.log(signing);
		console.log(verified);
  });
	// connect with metamask popup that connects to the wallet
	const connect = async () => {
		window.ethereum ?
		ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
			setAddress(accounts[0]);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			setEthers(provider);
		}).catch((err) => console.log(err))
	: console.log("Please install MetaMask")
	}

	// sign a message ( test ) can be verified independetly with verify
	const signMessage = async () => {
		const message = "test"
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();
		const messageObj = {
      message,
      signature,
      address
    };
		setSigning(messageObj);
    return messageObj;
  };

	// verify the message, confirm 100% the address owner has done the action
	const verifyMessage = async () => {
		const signerAddr = await ethers.utils.verifyMessage(signing.message, signing.signature);
		if (signerAddr.toLowerCase() !== address.toLowerCase()) {
			setVerified(false);
			return false;
		}
		setVerified(true);
		return true;
	};

  return (
		<div className="flex flex-col justify-between ">
			<button
			onClick={() => {
			connect()
			}}
			className="bg-violet-700 rounded-lg text-white px-2 py-3 mt-3 hover:bg-violet-900">Connect
			</button>
			<button
			onClick={() => {
			signMessage()
			}}
			className="bg-violet-700 rounded-lg text-white px-2 py-3 mt-3 hover:bg-violet-900">Sign
			</button> 
			<button
			onClick={() => {
			verifyMessage()
			}}
			className="bg-violet-700 rounded-lg text-white px-2 py-3 mt-3 hover:bg-violet-900">Verify
			</button> 
		</div>
  );
};
