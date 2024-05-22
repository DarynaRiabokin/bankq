import axios from "axios";
import { createContext, Component, useContext } from "react";
import { API_URL } from "../../constants/env";
import { departmentsSchema } from "./departments.schema";
import { normalizeData } from "../../helpers/normalizeData";
import { ContextType } from "./departments.types";

const DepartmentsContext = createContext<ContextType>({} as ContextType);

export class DepartmentsProvider extends Component<ProviderType, ContextType> {
  constructor(props: ProviderType) {
    super(props);

    this.state = {
      departments: null,
      departmentsList: [],
      loadDepartments: this.loadDepartments,
    };
  }

  loadDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      const data = departmentsSchema.parse(response.data);

      const [departments, departmentsList] = normalizeData(data.departments);

      this.setState({
        ...this.state,
        departments,
        departmentsList,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  render() {
    return (
      <DepartmentsContext.Provider value={this.state}>
        {this.props.children}
      </DepartmentsContext.Provider>
    );
  }
}

export function useDepartments() {
	const context = useContext(DepartmentsContext);

	if (context === undefined) {
		throw new Error('useDepartments must be used within a DepartmentsProvider');
	}

	return context;
}
