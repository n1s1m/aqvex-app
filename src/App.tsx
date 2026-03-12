import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Content } from "./components/content"

export function App() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex flex-col gap-4 text-sm leading-loose">
        <Content />
      </main>
      <Footer />
    </div>
  )
}

export default App
