import Button from './components/Inputs/Button';
import Checkbox from './components/Inputs/Checkbox';
import Form from './components/Form';
import FormSection from './components/Helpers/FormSection';
import Label from './components/Structure/Label';
import RowGenerator from './components/Helpers/RowGenerator';
import Select from './components/Inputs/Select';
import Text from './components/Inputs/Text';
import Textarea from './components/Inputs/Textarea';

import asCustomComponent from './components/Helpers/asCustomComponent';

const formSection = asCustomComponent(FormSection, { noWrapper: true, maintainState: false });

export default Form;
export {
  asCustomComponent,
  Button,
  Checkbox,
  formSection as FormSection,
  Label,
  RowGenerator,
  Select,
  Text,
  Textarea
};

