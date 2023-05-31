import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { getMethod3, putMethod3 } from "@/services";
import { PaymentRequest } from "@/types/payment/PaymentRequest";
import { PaymentResponse } from "@/types/payment/PaymentResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const mockData = [
  {
    subject: "Toán cao cấp - L01",
    credits: "3",
    priceOfOneCredit: "390 000",
    price: "1 170 000",
  },
  {
    subject: "Tếng Anh 1 - L05",
    credits: "3",
    priceOfOneCredit: "390 000",
    price: "1 170 000",
  },
  {
    subject: "Phương pháp tính - L02",
    credits: "1",
    priceOfOneCredit: "390 000",
    price: "390 000",
  },
];

export default function Billing() {
  const [hasWindow, setHasWindow] = useState(false);
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [paymentReponse, setPaymentResponse] = useState<PaymentResponse>();
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const router = useRouter();

  const getPayment = useApiCall<
    SuccessResponse<PaymentResponse[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod3({
        pathName: `${apiRoutes.payment}/me`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setPaymentResponse(
        data.result.find((e) => e.status === "AWAITTING_PAYMENT")
      );
      setAmount(paymentReponse?.amount || "");
    },
    handleError(status, message) {},
  });
  const putPayment = useApiCall<SuccessResponse<any>, ErrorResponse>({
    callApi: () =>
      putMethod3({
        pathName: `${apiRoutes.payment}/${paymentReponse?.id}`,
        token: cookie.token,
        request: {
          status: status,
        },
      }),
    handleSuccess(message, data) {
      toast.success("SUCCESS");
      setPaymentResponse(undefined);
      setAmount("");
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });

  const onHandleSubmitPayment = () => {
    setStatus("FINISHED");
    putPayment.setLetCall(true);
  };
  const onHandleSubmitCancelPayment = () => {
    setStatus("CANCELED");
    putPayment.setLetCall(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    if (router.isReady) {
      getPayment.setLetCall(true);
    }
  }, []);

  useEffect(() => {
    setAmount(paymentReponse?.amount || "");
  }, [paymentReponse]);

  return (
    <>
      {" "}
      {hasWindow && (
        <>
          <div
            style={{
              position: "relative",
              margin: "10rem 20% 50px 20% ",
            }}
          >
            <div style={{}}>
              <TableContainer component={Paper} className="scroll-x-auto">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Class
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Credits
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Price
                    </TableCell>
                  </TableHead>

                  <TableBody>
                    {paymentReponse?.paymentDetails?.map((e, index) => (
                      <TableRow key={index}>
                        <TableCell>{e.classroom.name}</TableCell>
                        <TableCell> 3</TableCell>
                        <TableCell>1230000 </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                        colSpan={2}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                        colSpan={1}
                      >
                        {amount}
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  {/* <TableHead> */}

                  {/* </TableHead> */}
                </Table>
              </TableContainer>

              <div
                style={{
                  margin: "1rem 0rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onHandleSubmitCancelPayment}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onHandleSubmitPayment}
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
