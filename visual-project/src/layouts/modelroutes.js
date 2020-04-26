import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Looks6Icon from '@material-ui/icons/Looks6';

import Resolve from '../views/model/ResolveView'
import Question from '../views/model/QuestionView'

let modelRoutes = [
    {
        path: "/resolve",
        name: "证据分解",
        icon: LooksOneIcon,
        layout: "/model",
        component: Resolve
    },
    {
        path: "/question",
        name: "质证采信",
        icon: LooksTwoIcon,
        layout: "/model",
        component: Question
    },

]

export default modelRoutes;