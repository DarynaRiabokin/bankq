import axios from "axios";
import { createContext, Component, useContext } from "react";
import { API_URL } from "../../constants/env";
import { createQueueSchema, queuesSchema } from "./queues.schema";
import { normalizeData } from "../../helpers/normalizeData";
import { ContextType, QueueCreateType } from "./queues.types";
import { getFromStorage } from "../../helpers/storage";

const QueuesContext = createContext<ContextType>({} as ContextType);

export class QueuesProvider extends Component<ProviderType, ContextType> {
  constructor(props: ProviderType) {
    super(props);

    this.state = {
      queues: null,
      queuesList: [],
      loadQueues: this.loadQueues,
      saveQueue: this.saveQueue,
      deleteQueue: this.deleteQueue,
    };
  }

  loadQueues = async () => {
    try {
      const response = await axios.get(`${API_URL}/queues`);
      const data = queuesSchema.parse(response.data);

      const [queues, queuesList] = normalizeData(data.queues);

      this.setState({
        ...this.state,
        queues,
        queuesList,
      });

      return [queues, queuesList];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  saveQueue = async (queue: QueueCreateType) => {
    try {
      const response = await axios.post(`${API_URL}/queues`, queue);
      const data = createQueueSchema.parse(response.data);

      this.setState({
        ...this.state,
        queues: {
          ...this.state.queues,
          [data.queue.id]: data.queue,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  deleteQueue = async (queueId: string) => {
    try {
      await axios.delete(`${API_URL}/queues/${queueId}`, {
        headers: {
          Authorization: `Bearer ${getFromStorage("token")}`,
        },
      });

      const queues = { ...this.state.queues };
      delete queues[queueId];

      this.setState({
        ...this.state,
        queues,
        queuesList: this.state.queuesList.filter((queue) => queue !== queueId),
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  render() {
    return (
      <QueuesContext.Provider value={this.state}>
        {this.props.children}
      </QueuesContext.Provider>
    );
  }
}

export function useQueues() {
  const context = useContext(QueuesContext);

  if (context === undefined) {
    throw new Error("useQueues must be used within a QueuesProvider");
  }

  return context;
}
