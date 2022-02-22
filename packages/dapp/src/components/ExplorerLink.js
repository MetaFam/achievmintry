import React from 'react';

const ExplorerLink = ({ type, hash, linkText }) => {
  const uri = () => {
    switch (process.env.REACT_APP_NETWORK_ID) {
      case '1': {
        return `https://etherscan.io/${type}/`;
      }
      case '42': {
        return `https://kovan.etherscan.io/${type}/`;
      }
      case '4': {
        return `https://rinkeby.etherscan.io/${type}/`;
      }
      case '100': {
        return `https://blockscout.com/poa/xdai/${type}/`;
      }
      default: {
        return `https://etherscan.io/${type}/`;
      }
    }
  };

  return (
    <p className="ExplorerLink">
      <a href={`${uri()}${hash}`} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    </p>
  );
};

export default ExplorerLink;
