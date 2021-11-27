import React, { useCallback, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, Typography, Select, message } from "antd";
import { Company } from "../../common/types/Company";
import { CenteredSpin } from "../../common/hoc/withSuspense";
import { bookingContract } from "../../common/const";
import { UserCompanyState, Web3AccountState } from "./recoil/auth.atoms";

interface CompanyAssignmentFormProps { };

const CompanyAssignmentForm: React.FC<CompanyAssignmentFormProps> = React.memo(() => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(Company.COLA);
  const [transactionPending, setTransactionPending] = useState<boolean>(false);

  const saveUserCompany = useSetRecoilState(UserCompanyState);
  const ethAddress = useRecoilValue(Web3AccountState);

  const onCancel = useCallback(() => message.error("You must select a company to proceed"), []);
  const onOk = useCallback(async () => {
    const company = Number(selectedCompany) as Company;

    if ([Company.PEPSI, Company.COLA].includes(company)) {
      try {
        setTransactionPending(true);
        await bookingContract.methods.assignToCompany(company).send({ from: ethAddress });
        saveUserCompany(company);
      } catch (err) {
        console.error(err);
      } finally {
        setTransactionPending(false);
      }
    }
  }, [saveUserCompany, selectedCompany, ethAddress]);

  return <Modal
    visible={true}
    title={<Typography.Title level={4}>Please select a company</Typography.Title>}
    onCancel={onCancel}
    onOk={onOk}
    maskStyle={useMemo(() => ({ zIndex: transactionPending ? 9999 : 1000 }), [transactionPending])}
    closable
    destroyOnClose
  >
    {transactionPending && CenteredSpin}
    <Select value={selectedCompany} onChange={setSelectedCompany} className="w-100">
      <Select.Option value={Company.PEPSI}>Pepsi</Select.Option>
      <Select.Option value={Company.COLA}>Cola</Select.Option>
    </Select>
  </Modal>
});

export { CompanyAssignmentForm };