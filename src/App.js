import { FigureContextProvider } from "./context/FigureContext";
import { PenContextProvider } from "./context/PenContex";
import { BoardPage } from "./pages/board/BoardPage";

function App() {
  return (
    <PenContextProvider>
      <FigureContextProvider>
          <BoardPage />
      </FigureContextProvider>
    </PenContextProvider>
  );
}

export default App;
