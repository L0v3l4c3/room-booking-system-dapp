import React, { useCallback } from "react";
import { Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { toFormattedHour } from "../../../common/utils/toFormattedHour";

interface CancellableReservationProps {
  onClose: (hour: number) => Promise<void>;
  hour: number;
  loading: boolean;
}

const CancellableReservation: React.FC<CancellableReservationProps> = React.memo(({ hour, onClose, loading }) => {
  const _onClose = useCallback(() => onClose(hour), [hour, onClose]);

  return <Tag color="red" icon={loading && <SyncOutlined spin />} onClose={_onClose} visible closable>{toFormattedHour(hour)}</Tag>;
})

export { CancellableReservation };