import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import DropDown from "@/components/dropdown2/DropDown";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { getMethod2, postMethod2 } from "@/services";
import { apiRoutes } from "@/constant/apiRoutes";
import { useApiCall } from "@/hooks";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth";
import { toast } from "react-toastify";
import { ClassroomResponseType } from "@/types/classroom/ClassroomResponse";
import { useEffect, useState, ChangeEvent } from "react";
import { ClassroomRegisterRequest } from "@/types/classroom/ClassroomRegisterRequest";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const StudentRegister = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 6,
  });
  const [subjects, setSubjects] = useState<SubjectResponseType[]>([]);
  const [classrooms, setClassrooms] = useState<
    ClassroomResponseType[] | undefined
  >([]);

  const [cookie, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const [countPage, setCountPage] = useState(1);
  const [checkedId, setCheckedId] = useState<string>("");

  const [request, setRequest] = useState({
    subjectId: "",
  });
  const [registerRequest, setRegisterRequest] =
    useState<ClassroomRegisterRequest>({ classroomIds: [] });

  const handleRegister = () => {
    registerClassroom.setLetCall(true);
  };
  const handleOnChange = (e: string) => {
    setCheckedId(e);
    setRegisterRequest({
      classroomIds: [e],
    });
  };
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };
  const handleChangeDropDown = (key: any, value: any) => {
    setRequest({
      ...request,
      [key]: value,
    });

    const classrooms = subjects.find(
      (subject) => subject.id === value
    )?.classrooms;
    setClassrooms(classrooms);
    setCheckedId("");
  };

  const getSubjects = useApiCall<
    SuccessResponse<SubjectResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.subject}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setSubjects(data.result.filter((e) => !e.isDeleted));
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });

  const registerClassroom = useApiCall<SuccessResponse<any>, ErrorResponse>({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.classroomRegister}`,
        token: cookie.token,
        request: registerRequest,
      }),
    handleSuccess(message, data) {
      toast.success("SUCCESS");
    },
    handleError(status, message) {
      toast.error("REGISTER FAIL");
    },
  });

  useEffect(() => {
    if (router.isReady) {
      getSubjects.setLetCall(true);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Button
            onClick={handleRegister}
            variant="contained"
            style={{
              margin: "1rem 0",
            }}
            disabled={!checkedId}
          >
            Register
          </Button>
          <div
            style={{
              minWidth: "10%",
              margin: "1rem 0",
            }}
          >
            <DropDown
              id="subjectId"
              label="Filter subject"
              list={subjects}
              value={request.subjectId}
              setValue={handleChangeDropDown}
            />
          </div>
        </div>
        <TableContainer component={Paper} className="scroll-x-auto">
          <Table
            sx={{ minWidth: 650 }}
            //   sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Checked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classrooms
                ?.filter((e) => !e.isDeleted)
                .map((row) => (
                  <TableRow
                    id={row.id}
                    style={{ cursor: "pointer" }}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleOnChange(row.id)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Checkbox
                        id={row.id}
                        {...label}
                        checked={row.id === checkedId}
                        onChange={() => handleOnChange(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Stack
          spacing={2}
          style={{
            zIndex: 0,
          }}
        >
          <Pagination
            count={countPage}
            defaultPage={1}
            boundaryCount={2}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};
