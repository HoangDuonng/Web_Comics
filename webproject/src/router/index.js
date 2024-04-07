import Vue from 'vue'
import Router from 'vue-router'
import Addbook from '@/components/Addbook'
import StoryList from '@/components/StoryList'
import EditStory from '@/components/EditStory'
import Author from '@/components/Author'
import AuuthorManagement from '@/components/AuuthorManagement'
import AuthorEdit from '@/components/AuthorEdit'
import AddAuthor from '@/components/AddAuthor'
import UserList from '@/components/UserList'
import EditChapter from '@/components/EditChapter'
import ChapterList from '@/components/ChapterList'
import Addchapter from '@/components/Addchapter'

import AddUser from '@/components/AddUser'
import EditUser from '@/components/EditUser'


import CompIndex from '@/components/layouts/CompIndex'
import ComHistory from '@/components/layouts/ComHistory'
import ComIntroduction from '@/components/layouts/ComIntroduction'
import FormRegister from '@/components/layouts/FormRegister'
import FormLogin from '@/components/layouts/FormLogin'
import FindPicture from '@/components/layouts/FindPicture'
import ActionCategory from '@/components/layouts/ActionCategory'
import DocTruyen from '@/components/layouts/DocTruyen'
import Chapterimage from '@/components/Chapterimage'
Vue.use(Router)
export default new Router({
  routes: [
    { path: '/home', component: CompIndex },,
    { path: '/Addbook', component: Addbook},
    { path: '/storylist', component: StoryList},
    { path: '/author', component: Author},
    { path: '/authorm', component: AuuthorManagement},
    { path: '/authoredit', name: 'EditAuthor', component: AuthorEdit},
    { path: '/addauthor', component: AddAuthor},
    { path: '/userlist', component: UserList},
    { path: '/adduser', component: AddUser},
    { path: '/edituser', component: EditUser},
    { path: '/edit', name: 'EditStory', component: EditStory },
    // { path: '/editauthor', name: 'EditAuthor', component: AuthorEdit},
    { path: '*', redirect: '/home' },
    { path: '/admin', redirect: '/storylist' },
    { path: '/editchapter',name: 'EditChapter', component: EditChapter},
    { path: '/addchapter', name: 'AddChapter' ,component: Addchapter},
    { path: '/chapterlist',name: 'ChapterList', component: ChapterList},
    { path: '/chapterimage',name: 'Chapterimage', component: Chapterimage},
    {path: '/history',component: ComHistory},
    {path: '/introduction',name: 'Introduction', component:ComIntroduction},
    {path: '/register',component:FormRegister},
    {path: '/login',component:FormLogin},
    {path: '/findpicture',component:FindPicture},
    {path: '/actioncategory',name: 'ActionCategory', component:ActionCategory},
    {path: '/doctruyen',name: 'DocTruyen', component:DocTruyen},
  ]
})

