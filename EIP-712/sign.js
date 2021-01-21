if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

const connectWalletButton = document.querySelector('#connectWallet');

connectWalletButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});

async function sign()
{
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

  if (accounts[0] == null) {
    return;
  }

  const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  };

  // The named list of all type definitions
  const types = {
      Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' }
      ],
      Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' }
      ]
  };

  // The data to sign
  const value = {
      from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
      },
      to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
      },
      contents: 'Hello, Bob!'
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Might need to replace _signTypedData with signTypedData as mentionned on https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
  const signature = await signer._signTypedData(domain, types, value);
  console.log(signature);
}

const signBtn = document.querySelector('#signBtn');

signBtn.addEventListener('click', () => {
  sign();
});
