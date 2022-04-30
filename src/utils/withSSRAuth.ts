import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { api } from "../services/apiClient"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import { validateUserPermissions } from "./validateUserPermitions"

type WithSRRAuthOptions = {
  roles?: string[]
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?:WithSRRAuthOptions) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        if(!cookies['nextauth.token']) {
            return {
                redirect: {
                destination: '/login',
                permanent: false
                }
            }
        }
        if(options) {
          const { roles } = options
          const {data} = await api.get('/me')
          const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
          }
          const userHasValidPermissions = validateUserPermissions({ user, roles })

          if(!userHasValidPermissions) {
            return {
              redirect: {
                destination: '/',
                permanent: false
              }
            }
          }
        }
        try {
          
          return await fn(ctx)
        } catch(err) {
          if( err instanceof AuthTokenError) {
            destroyCookie(ctx, "nextauth.token");
            return {
              redirect: {
                destination: "/login",
                permanent: false
              }
            }
          }
        }
    }
}
