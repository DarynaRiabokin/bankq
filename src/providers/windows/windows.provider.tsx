import axios from "axios";
import { createContext, Component, useContext } from "react";
import { API_URL } from "../../constants/env";
import { windowsSchema } from "./windows.schema";
import { normalizeData } from "../../helpers/normalizeData";
import { ContextType } from "./windows.types";

const WindowsContext = createContext<ContextType>({} as ContextType);

export class WindowsProvider extends Component<ProviderType, ContextType> {
  constructor(props: ProviderType) {
    super(props);

    this.state = {
      windows: null,
      windowsList: [],
      loadWindows: this.loadWindows,
    };
  }

  loadWindows = async () => {
    try {
      const response = await axios.get(`${API_URL}/windows`);
      const data = windowsSchema.parse(response.data);

      const [windows, windowsList] = normalizeData(data.windows);

      this.setState({
        ...this.state,
        windows,
        windowsList,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  render() {
    return (
      <WindowsContext.Provider value={this.state}>
        {this.props.children}
      </WindowsContext.Provider>
    );
  }
}

export function useWindows() {
  const context = useContext(WindowsContext);

  if (context === undefined) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }

  return context;
}
