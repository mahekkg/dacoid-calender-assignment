import { CalendarPage } from "./components/Calender.tsx";
import { CalendarProvider } from "./context/CalenderContext";

function App() {
  return (
    <>
      <CalendarProvider>
        <div className="max-w-6xl mx-auto min-h-screen bg-background">
          <CalendarPage />
        </div>
      </CalendarProvider>
    </>
  );
}

export default App;
