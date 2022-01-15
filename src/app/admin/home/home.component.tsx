import { TrendingUp as TrendingUpIcon } from "@mui/icons-material/";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { Spinner } from "../../shared/components/spinner/spinner";
import { useQueryGroups } from "../../shared/hooks/group";
import { useQueryUsers } from "../../shared/hooks/users";

export default function Home() {
  const { data: users } = useQueryUsers();
  const { data: groups } = useQueryGroups();

  const totalActivity = useMemo(
    () =>
      users?.reduce(
        (previousValue, user) => previousValue + user.activity,
        0
      ) ?? 0,
    [users]
  );

  const statisticsItems = useMemo(
    () => [
      { name: "用户", value: users?.length ?? 0, increase: 1.14 },
      { name: "群组", value: groups?.length ?? 0, increase: 5.14 },
      { name: "活跃度", value: totalActivity, increase: 19.19 },
    ],
    [users?.length, groups?.length, totalActivity]
  );

  const updateTime = useMemo(() => new Date(), [users, groups]);

  if (!(users && groups)) {
    return <Spinner />;
  }

  return (
    <>
      {statisticsItems.map(({ name, value, increase }) => (
        <Box
          key={name}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 300,
            mb: 1,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>{name}</Box>
          <Box
            sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}
          >
            {value}
          </Box>
          <Box
            component={TrendingUpIcon}
            sx={{ color: "success.dark", fontSize: 16, verticalAlign: "sub" }}
          />
          <Box
            sx={{
              color: "success.dark",
              display: "inline",
              fontWeight: "medium",
              mx: 0.5,
            }}
          >
            {increase}%
          </Box>
          <Box
            sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
          >
            相比于上个星期
          </Box>
        </Box>
      ))}
      统计时间：{updateTime.toLocaleString()}
    </>
  );
}
