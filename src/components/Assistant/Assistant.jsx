import { useEffect, useState } from "react";
import { Assistant as OpenAIAssistant } from "../../assistants/openai";
import styles from "./Assistant.module.css";

const assistantMap = {
  openai: OpenAIAssistant,
};

export function Assistant({ onAssistantChange }) {
  const [value, setValue] = useState(
    "openai:llama-3.3-70b-versatile"
  );

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const [assistant, model] = value.split(":");
    const AssistantClass = assistantMap[assistant];

    if (!AssistantClass) {
      throw new Error(`Unknown assistant: ${assistant}`);
    }

    onAssistantChange(new AssistantClass(model));
  }, [value]);

  return (
    <div className={styles.Assistant}>
      <span>Assistant:</span>

      <select value={value} onChange={handleValueChange}>
        <optgroup label="Groq">
          <option value="openai:llama-3.3-70b-versatile">
            Llama 3.3 70B
          </option>

          <option value="openai:llama3-8b-8192">
            Llama 3 8B
          </option>

          <option value="openai:mixtral-8x7b-32768">
            Mixtral 8x7B
          </option>
        </optgroup>
      </select>
    </div>
  );
}