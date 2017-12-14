import Button from './components/Inputs/Button';
import Checkbox from './components/Inputs/Checkbox';
import Date from './components/Inputs/Date';
import Duplicator from './components/Structure/Duplicator';
import Email from './components/Inputs/Email';
import Form from './components/Form';
import FormSectionTemplate from './components/Structure/FormSection';
import Label from './components/Structure/Label';
import Num from './components/Inputs/Num';
import Select from './components/Inputs/Select';
import Text from './components/Inputs/Text';
import Textarea from './components/Inputs/Textarea';
import asInternalComponent from './components/Helpers/asInternalComponent';

const FormSection = asInternalComponent(FormSectionTemplate);

export default Form;
export {
  Button,
  Checkbox,
  Date,
  Duplicator,
  Email,
  FormSection,
  Label,
  Num,
  Select,
  Text,
  Textarea
};

