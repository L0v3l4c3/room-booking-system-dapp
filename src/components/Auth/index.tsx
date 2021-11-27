import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookingContract } from "../../common/const";
import { CenteredSpin, withSuspense } from "../../common/hoc/withSuspense";
import { Company } from "../../common/types/Company";
import { CompanyAssignmentForm } from "./CompanyAssignmentForm";
import { UserCompanyState, Web3AccountState } from "./recoil/auth.atoms";

interface AuthProps { }

const Auth: React.FC<AuthProps> = ({ children }) => {
  const ethAccountAddress = useRecoilValue(Web3AccountState);
  const [userCompany, setUserCompany] = useRecoilState(UserCompanyState);

  useEffect(() => {
    bookingContract.methods.Users(ethAccountAddress).call()
      .then(company => setUserCompany(Number(company)))
  }, [ethAccountAddress, setUserCompany]);

  if (userCompany === undefined) {
    return CenteredSpin;
  }

  if (![Company.COLA, Company.PEPSI].includes(userCompany)) {
    return <CompanyAssignmentForm />;
  }

  return <>{children}</>;
}

export default withSuspense(Auth);