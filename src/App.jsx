import { Calendar } from "./components/calender";
import { CalendarProvider } from "./context/CalenderContext";

function App() {
  return (
    <>
      <CalendarProvider>
        <div className="max-w-6xl mx-auto min-h-screen bg-background">
          <Calendar />
        </div>
      </CalendarProvider>
    </>
  );
}

export default App;
