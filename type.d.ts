interface FormDataType {
    name: string
    company: string
    city: string
    state: string
    phone_number: string
  }
  
interface Employee extends FormDataType {
    id?: number;
}

interface formTypes{
    handleSubmit:  () => void;
    submitting: boolean;
    form: any;
}

interface rolePermissionType{
[roleName: string]: {
  routes: string[];
};
}