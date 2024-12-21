

export default function Home() {
  const [assistant, setAssistant] = useState(null);

  useEffect(() => {
    const initializeAssistant = async () => {
      const response = await fetch("/api/assistance", { method: "POST" });
      const data = await response.json();
      setAssistant(data.assistant);
    };

    initializeAssistant();
  }, []);

  return (
    <div>
      <h1>MealPrepper AI</h1>
      {assistant ? (
        <pre>{JSON.stringify(assistant, null, 2)}</pre>
      ) : (
        <p>Loading assistant...</p>
      )}
    </div>
  );
}