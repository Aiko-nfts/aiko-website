import { useContractCall, useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils, BigNumber } from "ethers";
import useGlobals from "../app/hooks/use-globals";

import abi from "./aiko.json";
import abiStamps from "./aikostamps.json";

const CONTRACT_ADDR = "0x7f60e977a7b9677be1795efe5ad5516866ab69a6";
const Interface = new utils.Interface(abiStamps);
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

export function useBalanceOf(): number[] | undefined {
  const { account } = useEthers();
  const stampCollection: number[] = [];
  const { value, error } =
    useCall(
      {
        contract: ContractInstance,
        method: "balanceOfBatch",
        args: [
          [
            account,
            account,
            account,
            account,
            account,
            account,
            account,
            account,
            account,
            account,
            account,
            account,
          ],
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
  value?.[0].forEach((result: BigNumber, id: number) => {
    stampCollection.push(Number(result));
  });
  return stampCollection;
}
