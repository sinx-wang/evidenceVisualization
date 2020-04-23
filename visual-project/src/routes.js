import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import CheckBox from "@material-ui/icons/CheckBox";
import CollectionsBookmark from "@material-ui/icons/CollectionsBookmark";

let casesRoutes = [
  {
    path: "/waitToDeal",
    name: "待处理案件",
    icon: CheckBoxOutlined,
    layout: "/cases"
  },
  {
    path: "/alreadyDealed",
    name: "已结案件",
    icon: CheckBox,
    layout: "/cases"
  },
  {
    path: "/dealing",
    name: "待结案件",
    icon: CollectionsBookmark,
    layout: "/cases"
  },
]

export default casesRoutes;