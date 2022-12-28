import { useContractCall, useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils, BigNumber } from "ethers";
import useGlobals from "../app/hooks/use-globals";

import abi from "./aiko.json";
import stampabi from "./aikostamps.json";

const CONTRACT_ADDR = "0x7f60e977a7b9677be1795efe5ad5516866ab69a6";
const Interface = new utils.Interface(abi);
const ContractInstance = new Contract(CONTRACT_ADDR, Interface);

export const useTotalSupply = (): number => {
  const globals = useGlobals();

  const [value] = useContractCall({
    abi: new utils.Interface(abi),
    address: globals.AIKO,
    method: "totalSupply",
    args: [1],
  }) ?? [BigNumber.from(0)];

  return Number(value.toString());
};

// export const useBalanceOf = () => {
//   const globals = useGlobals();

//   const { account } = useEthers();

//   const { value, error } =
//     useCall(
//       {
//         contract: ContractInstance,
//         method: "name",
//         args: [],
//       },
//       {
//         chainId: 137,
//       }
//     ) ?? {};
//   if (error) {
//     console.error(error.message);
//     return undefined;
//   }
//   return value?.[0];
// };

export function useBalanceOf(): number | undefined {
  const { account } = useEthers();
  const one = 1;

  const { value, error } =
    useCall(
      {
        contract: ContractInstance,
        method: "balanceOfBatch",
        args: [
          [account, account],
          ["1", "2"],
        ],
      },
      {
        chainId: 137,
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

// export const useBalanceOf = () => {
//   const globals = useGlobals();

//   const { account } = useEthers();

//   const [batchBalance] = useContractCall({
//     abi: new utils.Interface(stampabi),
//     address: globals.AIKO,
//     method: "balanceOfBatch",
//     args: [
//       [
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//         account,
//       ],
//       [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     ],
//   }) ?? [BigNumber.from(0)];

//   return batchBalance.toString();
// };
