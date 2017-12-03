import Button from './components/Inputs/Button';
import Checkbox from './components/Inputs/Checkbox';
import Duplicator from './components/Structure/Duplicator';
import Form from './components/Form';
import FormSectionTemplate from './components/Structure/FormSection';
import Label from './components/Structure/Label';
import Select from './components/Inputs/Select';
import Text from './components/Inputs/Text';
import Textarea from './components/Inputs/Textarea';
import asInternalComponent from './components/Helpers/asInternalComponent';

const FormSection = asInternalComponent(FormSectionTemplate);

export default Form;
export {
  Button,
  Duplicator,
  Checkbox,
  FormSection,
  Label,
  Select,
  Text,
  Textarea
};

