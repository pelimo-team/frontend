import React from 'react';

interface CodeInputsProps {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  setCode1: (value: string) => void;
  setCode2: (value: string) => void;
  setCode3: (value: string) => void;
  setCode4: (value: string) => void;
}

const CodeInputs: React.FC<CodeInputsProps> = ({
  code1,
  code2,
  code3,
  code4,
  setCode1,
  setCode2,
  setCode3,
  setCode4,
}) => {
  return (
    <div className="code-inputs">
      <input
        type="text"
        maxLength={1}
        value={code1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode1(e.target.value.replace(/\D/, ""))
        }
      />
      <input
        type="text"
        maxLength={1}
        value={code2}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode2(e.target.value.replace(/\D/, ""))
        }
      />
      <input
        type="text"
        maxLength={1}
        value={code3}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode3(e.target.value.replace(/\D/, ""))
        }
      />
      <input
        type="text"
        maxLength={1}
        value={code4}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode4(e.target.value.replace(/\D/, ""))
        }
      />
    </div>
  );
};

export default CodeInputs; 