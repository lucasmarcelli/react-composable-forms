import Button from './components/Inputs/Button';
import Checkbox from './components/Inputs/Checkbox';
import Form from './components/Form';
import FormSectionTemplate from './components/Structure/FormSectionTemplate';
import Label from './components/Structure/Label';
import Select from './components/Inputs/Select';
import Text from './components/Inputs/Text';
import Textarea from './components/Inputs/Textarea';
import asInternalComponent from './components/Helpers/asInternalComponent';

const FormSection = asInternalComponent(FormSectionTemplate, { customName: 'FormSection' });

export default Form;
export {
  Button,
  Checkbox,
  FormSection,
  Label,
  Select,
  Text,
  Textarea
};

