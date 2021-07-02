import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from "../services/AuthStateContext"
import { NotificationProvider } from "../services/NotificationsContext"
import { CableProvider } from "../services/ActionCableContext"
import { PetProvider } from "../services/PetContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CableProvider>
        <PetProvider>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </PetProvider>
      </CableProvider>
    </AuthProvider>
  )
}
export default MyApp
