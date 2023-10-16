import { Router } from "express";
import api_router from './api/index.js'

const index_router = Router()

index_router.use('/api', api_router)

export default index_router