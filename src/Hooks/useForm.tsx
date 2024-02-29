import './styles.modal.css';

interface Field {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormFieldProps {
  field: Field;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, handleChange }) => {
  switch (field.type) {
    case 'text':
    case 'date':
      return (
        <input
          className='input-field'
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={handleChange}
          required={field.required}
        />
      );
    case 'select':
      return (
        <select className='select-field' name={field.name} value={field.value} onChange={handleChange} required={field.required}>
          {field.options?.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
    default:
      return null;
  }
};

interface UseFormProps {
  fields: Field[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const UseForm: React.FC<UseFormProps> = ({ fields, handleChange, handleSubmit, onClose }) => {
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      {fields.map(field => (
        <FormField key={field.name} field={field} handleChange={handleChange} />
      ))}
      <div className="actionButtons">
        <button type="submit" className="submitButton">Submit</button>
        <button type="button" onClick={onClose} className="cancelButton">Cancel</button>
      </div>
    </form>
  );
};

export default UseForm;
