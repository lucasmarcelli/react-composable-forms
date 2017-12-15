import Button from './components/Inputs/Button';
import Checkbox from './components/Inputs/Checkbox';
import Duplicator from './components/Structure/Duplicator';
import Email from './components/Inputs/Email';
import Form from './components/Form';
import FormSectionTemplate from './components/Structure/FormSection';
import Label from './components/Structure/Label';
import MomentDate from './components/Inputs/Date';
import Num from './components/Inputs/Num';
import Password from './components/Inputs/Password';
import RadioGroupTemplate from './components/Inputs/RadioGroup';
import Select from './components/Inputs/Select';
import Text from './components/Inputs/Text';
import Textarea from './components/Inputs/Textarea';
import asInternalComponent from './components/Helpers/asInternalComponent';

const FormSection = asInternalComponent(FormSectionTemplate);
const RadioGroup = asInternalComponent(RadioGroupTemplate);

export default Form;
export {
  Button,
  Checkbox,
  Duplicator,
  MomentDate,
  Email,
  FormSection,
  Label,
  Num,
  Password,
  RadioGroup,
  Select,
  Text,
  Textarea
};

