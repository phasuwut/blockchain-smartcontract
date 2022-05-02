import Awarding from "components/Gobal/Award/Award";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import React from "react";

const Award = () => {
	return (
		<MasterLayout>
      <br/>

			<div className="flex justify-center">
				<div className="w-11/12">
					<div className="w-full">
            <h1 className="text-center">การออกรางวัล</h1>
						<Awarding />
					</div>
				</div>
			</div>
		</MasterLayout>
	);
};

export default Award;
