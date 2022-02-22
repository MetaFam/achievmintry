// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library ChievUtils {
    struct Chiev {
        uint256 priceFinney;
        uint256 numClonesAllowed;
        uint256 numClonesInWild;
        uint256 clonedFromId;
        uint256 permTokenId;
        uint256 permTokenMin;
        uint256 typeCode;
        string details;
    }

    // defining state variables
    struct ChievStorage {
        Chiev[] chievs;
    }

    // return a struct storage pointer for accessing the state variables
    function chievStorage() internal pure returns (ChievStorage storage ds) {
        bytes32 position = keccak256("diamond.standard.chiev.utils");
        assembly {
            ds.slot := position
        }
    }

    function initStorage() internal {
        ChievStorage storage ds = chievStorage();
        // If the array is new, skip over the first index.
        if (ds.chievs.length == 0) {
            Chiev memory _dummyChiev = Chiev({
                priceFinney: 0,
                numClonesAllowed: 0,
                numClonesInWild: 0,
                clonedFromId: 0,
                permTokenId: 0,
                permTokenMin: 0,
                typeCode: 0,
                details: ""
            });
            ds.chievs.push(_dummyChiev);
        }
    }

    function pushChiev(Chiev memory _chiev) internal {
        chievStorage().chievs.push(_chiev);
    }

    function chievCount() internal view returns (uint256) {
        return chievStorage().chievs.length;
    }

    function chievs(uint256 _tokenId) internal view returns (Chiev storage) {
        Chiev storage chiev = chievStorage().chievs[_tokenId];
        return chiev;
    }

    function deleteChiev(uint256 _tokenId) internal {
        delete chievStorage().chievs[_tokenId];
    }

    function getChievById(uint256 _tokenId)
        internal
        view
        returns (
            uint256 priceFinney,
            uint256 numClonesAllowed,
            uint256 numClonesInWild,
            uint256 clonedFromId,
            uint256 permTokenId,
            uint256 permTokenMin,
            uint256 typeCode,
            string memory details
        )
    {
        Chiev storage _chiev = chievStorage().chievs[_tokenId];

        priceFinney = _chiev.priceFinney;
        numClonesAllowed = _chiev.numClonesAllowed;
        numClonesInWild = _chiev.numClonesInWild;
        clonedFromId = _chiev.clonedFromId;
        permTokenId = _chiev.permTokenId;
        permTokenMin = _chiev.permTokenMin;
        typeCode = _chiev.typeCode;
        details = _chiev.details;
    }
}
